package co.globers.ibo.back.db

import co.globers.ibo.back.IboConfig
import org.jooq.DSLContext
import org.jooq.SQLDialect
import org.jooq.impl.DSL
import org.springframework.stereotype.Repository
import java.sql.DriverManager
import java.sql.Timestamp

import co.globers.ibo.jooq.Tables as Tables

@Repository
class Db(iboConfig: IboConfig) {

    data class EntityToGuess(
            val id: Int,
            val uri: String,
            val creationDatetime: Timestamp,
            val name: String
    )

    private val dbConfig = iboConfig.db

    private fun <T> withContext(query: (DSLContext) -> T): T {
        DriverManager.getConnection(dbConfig.url, dbConfig.user, dbConfig.password).use {connection ->
            val context = DSL.using(connection, SQLDialect.MYSQL)
            return query(context)
        }
    }

    fun getEntitiesToGuess(): List<EntityToGuess> {

        return withContext { context ->

            val result = context.select().from(Tables.ENTITY_TO_GUESS).fetch()
            result.map { r ->
                val id= r.getValue(Tables.ENTITY_TO_GUESS.ID)
                val uri= r.getValue(Tables.ENTITY_TO_GUESS.URI)
                val creationDatetime= r.getValue(Tables.ENTITY_TO_GUESS.CREATION_DATETIME)
                val name= r.getValue(Tables.ENTITY_TO_GUESS.NAME)

                EntityToGuess(id, uri, creationDatetime, name)
             }
        }
    }

}
