package co.globers.ibo.back

import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.stereotype.Service

import org.springframework.web.client.RestTemplate

@Service
class MlRestService(restTemplateBuilder: RestTemplateBuilder, iboConfig: IboConfig) {

    private val restTemplate: RestTemplate = restTemplateBuilder.build()
    private val mlUrl = iboConfig.ml_service.url

    data class GuessEntityQuery(val uri: String, val description_sentences: List<String>)
    data class EntityScoreReply(val uri: String, val score: Double)
    data class GuessEntityReply(val guesses: List<EntityScoreReply>)

    fun computeGuesses(uri:String, description_sentences: List<String>): GuessEntityReply {

        val url = "$mlUrl/guess_entity"
        val reply = restTemplate.postForObject(url, GuessEntityQuery(uri, description_sentences), GuessEntityReply::class.java)

        return reply!!
    }

}
