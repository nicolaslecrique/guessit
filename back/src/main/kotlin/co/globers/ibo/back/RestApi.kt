package co.globers.ibo.back

import co.globers.ibo.back.db.Db
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono
import reactor.util.function.Tuple2
import reactor.util.function.component1
import java.util.*

@CrossOrigin
@RestController
class RestApi(
        private val db: Db,
        private val mlRestService: MlRestService
) {

    data class PostNewUserResult(val userUri: String)
    @PostMapping("/post_new_user")
    fun postNewUser(): Mono<PostNewUserResult> {
        val userUri = UUID.randomUUID().toString()
        return db
                .insertUser(userUri)
                .map { PostNewUserResult(userUri) }
    }

    data class PostNewGameSessionRequestBody(val userUri: String)
    data class PostNewGameSessionResult(
            val gameSessionUri: String,
            val entitiesToGuess: List<Entity>
    ){
        data class Entity(
                val entityUri: String,
                val entityGuessingUri: String,
                val entityName: String)
    }

    @PostMapping("/post_new_game_session", consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun postNewGameSession(@RequestBody request: PostNewGameSessionRequestBody): Mono<PostNewGameSessionResult> {

        val gameSessionUri = UUID.randomUUID().toString()

        val entitiesToGuess = db.selectRandomEntitiesToGuess(20)

        // define an entityGuessingUri for each entity randomly selected
        val guessingUriToEntity = entitiesToGuess.map {
            list -> list.map { UUID.randomUUID().toString() to it }.toMap()
        }

        // insert game session
        val guessingUriToEntityInserted = guessingUriToEntity
                .flatMap { uriToEntity ->
                    db.insertGameSession(
                            gameSessionUri,
                            request.userUri,
                            uriToEntity.mapValues { it.value.id }).map { uriToEntity }
        }

        // return inserted game session
        return guessingUriToEntityInserted
                .map { map ->
                    PostNewGameSessionResult(
                            gameSessionUri,
                            map.map { PostNewGameSessionResult.Entity(it.value.uri, it.key, it.value.name) })
                }
    }

    data class PostEntityGuessingSentencesRequestBody(
            val entityToGuessUri: String,
            val entityGuessingUri: String,
            val previousSentences: List<String>,
            val newSentence: String)
    data class PostEntityGuessingSentencesResult(
        val guessedEntityUri: String,
        val guessedEntityName: String
    )
    @PostMapping("/post_entity_guessing_sentences", consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun postEntityGuessingSentences(@RequestBody request: PostEntityGuessingSentencesRequestBody): Mono<PostEntityGuessingSentencesResult> {

        val proposedEntitiesSorted = mlRestService
                .computeGuesses(
                        request.entityToGuessUri,
                        request.previousSentences + request.newSentence)
                .map { guesses -> guesses.toList().sortedBy { -it.second }.map { it.first } }

        val alreadyProposedEntitiesUri= db.selectGuessedEntitiesUris(request.entityGuessingUri).map { it.toSet() }

        return Mono
                .zip(proposedEntitiesSorted, alreadyProposedEntitiesUri)
                .map { tuple ->
                    // find the correct proposition: best not yet proposed, if everything already proposed, return first
                    tuple.t1.firstOrNull() { ! tuple.t2.contains(it) } ?: tuple.t1.first()
                }.doOnNext {
                    db.insertEntityGuessingSentence(
                            request.entityGuessingUri, UUID.randomUUID().toString(), it, request.newSentence )
                }
                .zipWhen{
                    // associate name to uri
                    db.selectEntityName(it)
                }.map {
                    PostEntityGuessingSentencesResult(it.t1,it.t2)
                }

    }



}
