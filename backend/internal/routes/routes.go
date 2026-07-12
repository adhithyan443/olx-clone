package routes

import (
	"github.com/adhithyan443/olx-clone/backend/internal/handler"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine, userHandler *handler.UserHandler){

	api := router.Group("/api")
	{
		api.POST("/register",userHandler.Register)
	}

	router.GET("/health", func(ctx *gin.Context) {
		ctx.JSON(200,gin.H{
			"success" : true,
			"message" : "Server running",
		})
	})
}