package co.globers.ibo.back

import co.globers.ibo.back.db.Db
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
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
        return Mono.just(PostNewUserResult(userUri))
    }

}
