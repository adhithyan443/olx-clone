package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/adhithyan443/olx-clone/backend/internal/utils"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		
		authHeader := ctx.GetHeader("Authorization")

		if authHeader == "" {

			ctx.JSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Authorization header missing",
			})

			ctx.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")

		if len(parts) != 2 || parts[0] != "Bearer" {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Invalid authorization header",
			})

			ctx.Abort()
			return
		}

		tokenString := parts[1]

		claims := &utils.JWTClaims{}

		token, err := jwt.ParseWithClaims(   //This checks: Is the token signed correctly? Has it expired? Was it created using our secret key?
			tokenString,
			claims,
			func(token *jwt.Token) (interface{}, error) {
				return []byte(os.Getenv("JWT_SECRET")), nil
			},
		)

		if err != nil || !token.Valid {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Invalid or expired token",
			})

			ctx.Abort()
			return
		}

		ctx.Set("userID", claims.UserID)
		ctx.Set("email", claims.Email)

		ctx.Next()
	}
}
