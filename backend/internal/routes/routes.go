package routes

import (
	"github.com/adhithyan443/olx-clone/backend/internal/handler"
	"github.com/adhithyan443/olx-clone/backend/internal/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine, userHandler *handler.UserHandler, productHandler *handler.ProductHandler, cartHandler *handler.CartHandler) {

	api := router.Group("/api")
	{
		api.POST("/register", userHandler.Register)
		api.POST("/login", userHandler.Login)

		api.GET(
			"/profile",
			middleware.AuthMiddleware(),
			userHandler.GetProfile,
		)

		//Products
		api.POST(
			"/products",
			middleware.AuthMiddleware(),
			productHandler.Create,
		)

		api.GET("/products", productHandler.GetAll)
		api.GET("/products/:id", productHandler.GetByID)
		api.GET("/my-products", middleware.AuthMiddleware(), productHandler.GetMyProduct)
		api.PUT("/products/:id", middleware.AuthMiddleware(), productHandler.Update)
		api.DELETE("/products/:id", middleware.AuthMiddleware(), productHandler.Delete)
		api.POST("/checkout", middleware.AuthMiddleware(), productHandler.Checkout)

		api.POST("/cart", middleware.AuthMiddleware(), cartHandler.AddToCart)
		api.GET("/cart", middleware.AuthMiddleware(), cartHandler.GetCart)
		api.DELETE("/cart/:productId", middleware.AuthMiddleware(), cartHandler.Remove)
		api.DELETE("/cart", middleware.AuthMiddleware(), cartHandler.Clear)
	}

	router.GET("/health", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"success": true,
			"message": "Server running",
		})
	})
}
