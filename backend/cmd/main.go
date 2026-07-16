package main

import (
	"log"
	"os"

	"github.com/adhithyan443/olx-clone/backend/config"
	"github.com/adhithyan443/olx-clone/backend/internal/handler"
	"github.com/adhithyan443/olx-clone/backend/internal/repository"
	"github.com/adhithyan443/olx-clone/backend/internal/routes"
	"github.com/adhithyan443/olx-clone/backend/internal/usecase"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	config.LoadEnv()
	config.ConnectDatabase()

	if err := config.MigrateDatabase(); err != nil {
		log.Fatal("Migration Failed: ", err)
	}

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173",
			"http://127.0.0.1:5173",
		},
		AllowMethods: []string{
			"GET",
			"POST",
			"PUT",
			"PATCH",
			"DELETE",
			"OPTIONS",
		},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Accept",
			"Authorization",
		},
		AllowCredentials: true,
	}))

	//user
	userRepo := repository.NewUserRepository(config.DB)
	userUsecase := usecase.NewUserUsecase(userRepo)
	userHandler := handler.NewUserHandler(userUsecase)

	//products
	productRepo := repository.NewProductRepository(config.DB)
	productUsecase := usecase.NewProductUsecase(productRepo)
	productHandler := handler.NewProductHandler(productUsecase)

	routes.SetupRoutes(
		router,
		userHandler,
		productHandler,
	)

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
