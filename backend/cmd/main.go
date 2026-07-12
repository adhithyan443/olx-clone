package main

import (
	"log"
	"os"

	"github.com/adhithyan443/olx-clone/backend/config"
	"github.com/gin-gonic/gin"
)

func main() {

	config.LoadEnv()
	config.ConnectDatabase()

	if err := config.MigrateDatabase(); err != nil {
		log.Fatal("Migration Failed: ", err)
	}

	router := gin.Default()

	router.GET("/health", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"success": true,
			"message": "Server is running",
		})
	})

	port := os.Getenv("PORT")
	log.Println("Server started on port: ", port)

	router.Run(":" + port)
}
