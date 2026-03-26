package mtkigali.ac.rw.onlineJobPortal.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);;

    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenValid(String token, String username) {
        String extractedUsername = extractClaims(token).getSubject();
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

   
}

// package auca.ac.rw.onlineJobPortal.util;

// import io.jsonwebtoken.*;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Component;

// import javax.crypto.SecretKey;
// import java.util.Date;

// @Component
// public class JwtUtil {

//     // Inject the Base64-encoded secret key from application.properties or application.yml
//     @Value("${jwt.secret}")
//     private String base64SecretKey;

//     // Decode the Base64 secret key into a SecretKey object
//     private SecretKey getDecodedSecretKey() {
//         return Keys.hmacShaKeyFor(java.util.Base64.getDecoder().decode(base64SecretKey));
//     }

//     public String generateToken(String username, String role) {
//         return Jwts.builder()
//                 .setSubject(username)
//                 .claim("role", role)
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
//                 .signWith(getDecodedSecretKey(), SignatureAlgorithm.HS256) // Use the decoded key
//                 .compact();
//     }

//     public Claims extractClaims(String token) {
//         return Jwts.parserBuilder()
//                 .setSigningKey(getDecodedSecretKey())
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody();
//     }

//     public boolean isTokenValid(String token, String username) {
//         String extractedUsername = extractClaims(token).getSubject();
//         return (extractedUsername.equals(username) && !isTokenExpired(token));
//     }

//     public boolean isTokenExpired(String token) {
//         return extractClaims(token).getExpiration().before(new Date());
//     }
// }

