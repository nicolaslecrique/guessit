package co.globers.ibo.back

import co.globers.ibo.back.db.Db
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono
import java.util.*

@CrossOrigin
@RestController
class RestApi(private val db: Db) {

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
        data class Entity(val entityUri: String, val entityName: String)
    }

    @PostMapping("/post_new_game_session", consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun postNewGameSession(@RequestBody request: PostNewGameSessionRequestBody): Mono<PostNewGameSessionResult> {
        val gameSessionUri = UUID.randomUUID().toString()
        val entitiesToGuess = db.selectRandomEntitiesToGuess(20)
        val gameSessionInsert = db
                .insertGameSession(gameSessionUri, request.userUri)

        return Mono
                .zip(entitiesToGuess, gameSessionInsert)
                .map { zip ->
                    PostNewGameSessionResult(
                            gameSessionUri,
                            zip.t1.map { PostNewGameSessionResult.Entity(it.uri, it.name) })
                }
    }


}
