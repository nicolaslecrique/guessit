package co.globers.ibo.back


import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties("ibo")
class IboConfig {

    val ml = MlConfig()

    @Suppress("PropertyName", "VariableNaming")
    class MlConfig {
        lateinit var url: String
    }

}
