package routes

import (
	"github.com/adhithyan443/olx-clone/backend/internal/handler"
	"github.com/adhithyan443/olx-clone/backend/internal/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine, userHandler *handler.UserHandler) {

	api := router.Group("/api")
	{
		api.POST("/register", userHandler.Register)
		api.POST("/login", userHandler.Login)

		api.GET(
			"/profile",
			middleware.AuthMiddleware(),
			userHandler.GetProfile,
		)
	}

	router.GET("/health", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"success": true,
			"message": "Server running",
		})
	})
}
