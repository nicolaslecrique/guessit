package co.globers.ibo.back.db

import co.globers.ibo.back.IboConfig
import co.globers.ibo.jooq.Tables
import org.jooq.DSLContext
import org.jooq.SQLDialect
import org.jooq.impl.DSL
import org.jooq.impl.DSL.inline
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono
import java.sql.DriverManager
import java.sql.Timestamp
import java.util.*

@Repository
class Db(iboConfig: IboConfig) {

    data class EntityToGuess(
            val id: Int,
            val uri: String,
            val creationDatetime: Timestamp,
            val name: String
    )

    private val dbConfig = iboConfig.db

    private val connectionInfos = Properties()

    init {
        connectionInfos.putAll( mapOf(
                "user" to dbConfig.user,
                "password" to dbConfig.password)
        )

        if (dbConfig.use_cloud_sql) {
            connectionInfos.putAll(mapOf(
                    "socketFactory" to "com.google.cloud.sql.postgres.SocketFactory",
                    "useSSL" to "false",
                    "cloudSqlInstance" to dbConfig.cloud_sql_instance
            ))
        }

    }

    private fun <T> withContext(query: (DSLContext) -> T): T {

        DriverManager.getConnection(dbConfig.url, connectionInfos).use {connection ->
            val context = DSL.using(connection, SQLDialect.POSTGRES)
            return query(context)
        }
    }

    private fun <T> withTransactionContext(query: (DSLContext) -> T): T {
        return withContext { context ->
            context.transactionResult { transConfig ->
                val transactionContext = DSL.using(transConfig)
                query(transactionContext)
            }
        }
    }

    fun insertUser(userUri: String): Int {
        return withContext { context ->
            context.insertInto(Tables.USER, Tables.USER.URI).values(userUri).execute()
        }
    }

    fun insertGameSession(gameSessionUri: String, userUri: String, entityGuessingUriToEntityToGuessId: Map<String,Int>): Int {
        return withTransactionContext { context ->

            // 1) Insert Game session
            val gameSessionId = context
                    .insertInto(Tables.GAME_SESSION, Tables.GAME_SESSION.URI, Tables.GAME_SESSION.USER_ID)
                    .select(
                            context
                                    .select(inline(gameSessionUri), Tables.USER.ID)
                                    .from(Tables.USER)
                                    .where(Tables.USER.URI.equal(userUri))
                    )
                    .returningResult(Tables.GAME_SESSION.ID)
                    .fetchOne()
                    .value1()

            // 2) insert entity guessings
            var insertQuery = context
                    .insertInto(
                            Tables.ENTITY_GUESSING,
                            Tables.ENTITY_GUESSING.URI,
                            Tables.ENTITY_GUESSING.GAME_SESSION_ID,
                            Tables.ENTITY_GUESSING.ENTITY_TO_GUESS_ID
                    )

            entityGuessingUriToEntityToGuessId.forEach { (entityGuessingUri, entityToGuessId) ->
                insertQuery = insertQuery.values(entityGuessingUri, gameSessionId, entityToGuessId)
            }

            insertQuery.execute()
        }
    }


    fun selectRandomEntitiesToGuess(nbEntities: Int): List<EntityToGuess> {

        return withContext {context ->

            val result = context
                    .select()
                    .from(Tables.ENTITY_TO_GUESS)
                    .orderBy(DSL.rand())
                    .limit(nbEntities)
                    .fetch()

            result.map { r ->
                val id= r.getValue(Tables.ENTITY_TO_GUESS.ID)
                val uri= r.getValue(Tables.ENTITY_TO_GUESS.URI)
                val creationDatetime= r.getValue(Tables.ENTITY_TO_GUESS.CREATION_DATETIME)
                val name= r.getValue(Tables.ENTITY_TO_GUESS.NAME)

                EntityToGuess(id, uri, creationDatetime, name)

            }
        }
    }

    fun selectGuessedEntitiesUris(entityGuessingUri: String): List<String> {
        return withContext { context ->
            context
                    .select(Tables.ENTITY_TO_GUESS.URI)
                    .from(Tables.ENTITY_TO_GUESS)
                    .join(Tables.ENTITY_GUESSING_SENTENCE).on(Tables.ENTITY_GUESSING_SENTENCE.GUESSED_ENTITY_ID.equal(Tables.ENTITY_TO_GUESS.ID))
                    .join(Tables.ENTITY_GUESSING).on(Tables.ENTITY_GUESSING.ID.equal(Tables.ENTITY_GUESSING_SENTENCE.ENTITY_GUESSING_ID))
                    .where(Tables.ENTITY_GUESSING.URI.equal(entityGuessingUri))
                    .fetch()
                    .map { r -> r.getValue(Tables.ENTITY_TO_GUESS.URI) }
        }
    }

    // add sentence / guess to an entityGuessing
    fun insertEntityGuessingSentence(
            entityGuessingUri: String,
            entityGuessingSentenceUri: String,
            guessedEntityUri: String,
            sentence: String
    ): Int {

        return withContext { context ->

            context
                    .insertInto(
                            Tables.ENTITY_GUESSING_SENTENCE,
                            Tables.ENTITY_GUESSING_SENTENCE.URI,
                            Tables.ENTITY_GUESSING_SENTENCE.ENTITY_GUESSING_ID,
                            Tables.ENTITY_GUESSING_SENTENCE.SENTENCE,
                            Tables.ENTITY_GUESSING_SENTENCE.GUESSED_ENTITY_ID
                    )
                    .select(
                            context
                                    .select(
                                            inline(entityGuessingSentenceUri),
                                            Tables.ENTITY_GUESSING.ID,
                                            inline(sentence),
                                            Tables.ENTITY_TO_GUESS.ID
                                    )
                                    .from(Tables.ENTITY_GUESSING, Tables.ENTITY_TO_GUESS)
                                    .where(Tables.ENTITY_GUESSING.URI.equal(entityGuessingUri))
                                    .and(Tables.ENTITY_TO_GUESS.URI.equal(guessedEntityUri))
                    )
                    .execute()
        }
    }

    fun selectEntityName(entityUri: String): String {
        return withContext { context ->
            context
                    .select(Tables.ENTITY_TO_GUESS.NAME)
                    .from(Tables.ENTITY_TO_GUESS)
                    .where(Tables.ENTITY_TO_GUESS.URI.equal(entityUri))
                    .fetchOne()
                    .map { r -> r.getValue(Tables.ENTITY_TO_GUESS.NAME) }
        }
    }


    fun selectEntityNameToGuessAndGuessed(gameSessionUri: String): Mono<Map<String, String>> {

        return withContext { context ->

            val entityGuessingUri = "EntityGuessingUri"

            val entityToGuessName = context
                    .select(Tables.ENTITY_TO_GUESS.NAME)
                    .from(Tables.ENTITY_TO_GUESS)
                    .join(Tables.ENTITY_GUESSING).on(Tables.ENTITY_GUESSING.ENTITY_TO_GUESS_ID.equal(Tables.ENTITY_TO_GUESS.ID))
                    .where(Tables.ENTITY_GUESSING.URI.equal(entityGuessingUri))

            val tableEntityToGuessGuessed = Tables.ENTITY_TO_GUESS.`as`("entityToGuessGuessed")
            val entityGuessedName = context
                    .select(tableEntityToGuessGuessed.NAME)
                    .from(tableEntityToGuessGuessed)
                    .join(Tables.ENTITY_GUESSING_SENTENCE).on(Tables.ENTITY_GUESSING_SENTENCE.GUESSED_ENTITY_ID.equal(tableEntityToGuessGuessed.ID))
                    .where(Tables.ENTITY_GUESSING.URI.equal(entityGuessingUri))
                    .and(Tables.ENTITY_GUESSING_SENTENCE.ENTITY_GUESSING_ID.equal(Tables.ENTITY_GUESSING.ID))



            // return max creation date for an entityGuessingUri
            val maxCreationDate = context
                    .select(DSL.max(Tables.ENTITY_GUESSING_SENTENCE.CREATION_DATETIME))
                    .from(Tables.ENTITY_GUESSING_SENTENCE)
                    .join(Tables.ENTITY_GUESSING).on(Tables.ENTITY_GUESSING.ID.eq(Tables.ENTITY_GUESSING_SENTENCE.ENTITY_GUESSING_ID))
                    .where(Tables.ENTITY_GUESSING.URI.eq(entityGuessingUri))

            // return entity guessed in the last sentence of an entityGuessingUri
            val entityIdGuessedWithMaxDate = context
                    .select(Tables.ENTITY_GUESSING_SENTENCE.GUESSED_ENTITY_ID)
                    .from(Tables.ENTITY_GUESSING_SENTENCE)
                    .join(Tables.ENTITY_GUESSING).on(Tables.ENTITY_GUESSING.ID.eq(Tables.ENTITY_GUESSING_SENTENCE.ENTITY_GUESSING_ID))
                    .where(Tables.ENTITY_GUESSING.URI.eq(entityGuessingUri))
                    .and(Tables.ENTITY_GUESSING_SENTENCE.CREATION_DATETIME.eq(maxCreationDate))


            // return entity name from entityId
            val entityNameGuessed = context
                    .select(Tables.ENTITY_TO_GUESS.NAME)
                    .from(Tables.ENTITY_TO_GUESS)
                    .where(Tables.ENTITY_TO_GUESS.ID.eq(entityIdGuessedWithMaxDate))



            // pour un groupe de sentence, retourn le max



            // idées:


            mapOf()
        }


    }


}
