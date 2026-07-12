package main

import (
	"log"
	"os"

	"github.com/adhithyan443/olx-clone/backend/config"
	"github.com/adhithyan443/olx-clone/backend/internal/handler"
	"github.com/adhithyan443/olx-clone/backend/internal/repository"
	"github.com/adhithyan443/olx-clone/backend/internal/routes"
	"github.com/adhithyan443/olx-clone/backend/internal/usecase"
	"github.com/gin-gonic/gin"
)

func main() {

	config.LoadEnv()
	config.ConnectDatabase()

	if err := config.MigrateDatabase(); err != nil {
		log.Fatal("Migration Failed: ", err)
	}

	router := gin.Default()

	repo := repository.NewUserRepository(config.DB)
	userUsecase := usecase.NewUserUsecase(repo)
	userHandler := handler.NewUserHandler(userUsecase)

	routes.SetupRoutes(router, userHandler)

	// router.GET("/health", func(ctx *gin.Context) {
	// 	ctx.JSON(200, gin.H{
	// 		"success": true,
	// 		"message": "Server is running",
	// 	})
	// })

	port := os.Getenv("PORT")
	log.Println("Server started on port: ", port)

	router.Run(":" + port)
}
