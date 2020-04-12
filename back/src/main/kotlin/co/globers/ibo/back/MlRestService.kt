package co.globers.ibo.back

import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.stereotype.Service

import org.springframework.web.client.RestTemplate

@Service
class MlRestService(restTemplateBuilder: RestTemplateBuilder, iboConfig: IboConfig) {

    private val restTemplate: RestTemplate = restTemplateBuilder.build()
    private val mlUrl = iboConfig.ml_service.url

    data class GuessEntityQuery(val entity_to_guess_uri: String, val description_sentences: List<String>)
    data class GuessEntityReply(val guesses: Map<String, Double>)

    fun computeGuesses(entity_to_guess_uri:String, description_sentences: List<String>): Map<String, Double> {

        val url = "$mlUrl/guess_entity"
        val reply = restTemplate.postForObject(url, GuessEntityQuery(entity_to_guess_uri, description_sentences), GuessEntityReply::class.java)

        return reply!!.guesses
    }

}
