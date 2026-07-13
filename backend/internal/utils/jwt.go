package utils

import (
	
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JWTClaims struct {
	UserID               string `json:"user_id"`
	Email                string `json:"email"`
	jwt.RegisteredClaims        //Claims are the data stored inside the token.
}

func GenerateToken(userID, email string) (string, error) {

	claims := JWTClaims{ //Create a claim
		UserID: userID,
		Email:  email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt: jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims( //This creates an unsigned token.
		jwt.SigningMethodHS256,
		claims,
	)

	return token.SignedString( //This signs the token using your secret key.
		[]byte(os.Getenv("JWT_SECRET")),
	)
}
