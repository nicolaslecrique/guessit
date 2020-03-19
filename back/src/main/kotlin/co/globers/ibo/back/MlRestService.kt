package co.globers.ibo.back

import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.stereotype.Service

import org.springframework.web.client.RestTemplate
import java.util.*

@Service
class MlRestService(restTemplateBuilder: RestTemplateBuilder, iboConfig: IboConfig) {

    private val restTemplate: RestTemplate = restTemplateBuilder.build()
    private val mlUrl = iboConfig.ml.url

    data class GuessEntityQuery(val description_sentences: List<String>)
    data class GuessEntityReply(val guesses: Map<String, Double>)

    fun computeGuesses(description_sentences: List<String>): Map<String, Double> {

        val url = "$mlUrl/guess_entity"
        val reply = restTemplate.postForObject(url, GuessEntityQuery(description_sentences), GuessEntityReply::class.java)

        return reply!!.guesses
    }


}
