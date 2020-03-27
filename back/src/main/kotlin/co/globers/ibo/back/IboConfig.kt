package co.globers.ibo.back


import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Suppress("PropertyName")
@Component
@ConfigurationProperties("ibo")
class IboConfig {

    val ml_service = MlServiceConfig()
    val db = DbConfig()

    class MlServiceConfig {
        lateinit var url: String
    }

    class DbConfig {
        lateinit var url: String
        lateinit var user: String
        lateinit var password: String
        var use_cloud_sql: Boolean = false
        var cloud_sql_instance: String? = null
    }

}
