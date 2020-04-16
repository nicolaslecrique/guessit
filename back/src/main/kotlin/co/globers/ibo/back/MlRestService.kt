package co.globers.ibo.back

import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono

@Service
class MlRestService(iboConfig: IboConfig) {

    private val mlClient = WebClient.create(iboConfig.ml_service.url)

    data class GuessEntityQuery(val entity_to_guess_uri: String, val description_sentences: List<String>)
    data class GuessEntityReply(val guesses: Map<String, Double>)

    fun computeGuesses(entity_to_guess_uri:String, description_sentences: List<String>): Mono<Map<String, Double>> {

        return  mlClient
                .post()
                .uri("/guess_entity")
                .bodyValue(GuessEntityQuery(entity_to_guess_uri, description_sentences))
                .retrieve()
                .bodyToMono(GuessEntityReply::class.java)
                .map { it.guesses }
    }

}
