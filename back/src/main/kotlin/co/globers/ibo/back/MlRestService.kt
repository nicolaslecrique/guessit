package co.globers.ibo.back

import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class MlRestService(iboConfig: IboConfig) {

    private val mlClient = WebClient.create(iboConfig.ml_service.url)

    // api specifications, do not rename
    data class GuessEntityQuery(val descriptionSentences: List<String>)
    data class GuessEntityReply(val guesses: Map<String, Double>)

    fun computeGuesses(descriptionSentences: List<String>): Map<String, Double> {

        return  mlClient
                .post()
                .uri("/guess_entity")
                .bodyValue(GuessEntityQuery(descriptionSentences))
                .retrieve()
                .bodyToMono(GuessEntityReply::class.java)
                .map { it.guesses }
                .block()!!
    }

    data class SentencesQuery(val entityToGuessUri: String, val descriptionSentences: List<String>)

    fun addSentences(entityToGuessUri:String, descriptionSentences: List<String>) {
        mlClient
        .post()
        .uri("/sentences")
        .bodyValue(SentencesQuery(entityToGuessUri, descriptionSentences))
        .retrieve()
        .bodyToMono(Void::class.java)
        .block();
    }
}
