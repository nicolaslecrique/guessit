package co.globers.ibo.back

import co.globers.ibo.back.db.Db
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.*

@CrossOrigin
@RestController
class RestApi(
        private val db: Db,
        private val mlRestService: MlRestService
) {

    data class PostNewUserResult(val userUri: String)

    @PostMapping("/user")
    fun postNewUser(): PostNewUserResult {
        val userUri = UUID.randomUUID().toString()
        db.insertUser(userUri)
        return PostNewUserResult(userUri)
    }

    data class PostNewGameSessionRequestBody(val userUri: String)
    data class PostNewGameSessionResult(
            val gameSessionUri: String,
            val entitiesToGuess: List<Entity>
    ) {
        data class Entity(
                val entityUri: String,
                val entityGuessingUri: String,
                val entityName: String)
    }

    @PostMapping("/game_session", consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun postNewGameSession(@RequestBody request: PostNewGameSessionRequestBody): PostNewGameSessionResult {

        val gameSessionUri = UUID.randomUUID().toString()
        val entitiesToGuess = db.selectRandomEntitiesToGuess(20)

        // define an entityGuessingUri for each entity randomly selected
        val entityGuessingUriToEntity = entitiesToGuess.map { UUID.randomUUID().toString() to it }.toMap()
        db.insertGameSession(gameSessionUri, request.userUri, entityGuessingUriToEntity.mapValues { it.value.id })

        return PostNewGameSessionResult(
                gameSessionUri,
                entityGuessingUriToEntity.map { (entityGuessingUri, entity) ->
                    PostNewGameSessionResult.Entity(entity.uri, entityGuessingUri, entity.name)
                }
        )
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

    @PostMapping("/entity_guessing_sentence", consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun postEntityGuessingSentences(@RequestBody request: PostEntityGuessingSentencesRequestBody): PostEntityGuessingSentencesResult {

        val proposedEntitiesSorted = mlRestService
                .computeGuesses(request.entityToGuessUri,request.previousSentences + request.newSentence)
                .toList()
                .sortedBy { -it.second }
                .map { it.first }

        val alreadyProposedEntitiesUri = db.selectGuessedEntitiesUris(request.entityGuessingUri)

        val guessedEntityUri = proposedEntitiesSorted
                .firstOrNull { !alreadyProposedEntitiesUri.contains(it) }
                ?: proposedEntitiesSorted.first()

        db.insertEntityGuessingSentence(
                request.entityGuessingUri, UUID.randomUUID().toString(), guessedEntityUri, request.newSentence)
        val guessedEntityName = db.selectEntityName(guessedEntityUri)
        return PostEntityGuessingSentencesResult(guessedEntityUri, guessedEntityName)
    }


    /*
    data class GetGameSessionResultResult(
            val entityGuessingSessions: List<EntityGuessing>
    ) {
        data class EntityGuessing(
                val entityToGuessName: String,
                val entityGuessedName: String
        )
    }

    @GetMapping("/game_session_result")
    fun getGameSessionResult(@RequestParam gameSessionUri: String): GetGameSessionResultResult {

        //val result: Map<String,String> = db.selectEntityNameToGuessAndGuessed(gameSessionUri)


        return Mono.empty();
    }
    */



}
