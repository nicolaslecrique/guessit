package co.globers.ibo.back.db

import co.globers.ibo.back.IboConfig
import co.globers.ibo.jooq.Tables
import org.jooq.DSLContext
import org.jooq.SQLDialect
import org.jooq.impl.DSL
import org.springframework.stereotype.Repository
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

    private fun <T> withContext(query: (DSLContext) -> T): T {

        val info = Properties()
        info.putAll( mapOf(
                "user" to dbConfig.user,
                "password" to dbConfig.password)
        )

        if (dbConfig.use_cloud_sql) {
            info.putAll(mapOf(
                    "socketFactory" to "com.google.cloud.sql.postgres.SocketFactory",
                    "useSSL" to "false",
                    "cloudSqlInstance" to dbConfig.cloud_sql_instance
            ))
        }

        DriverManager.getConnection(dbConfig.url, info).use {connection ->
            val context = DSL.using(connection, SQLDialect.POSTGRES)
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
