package handler

import (
	"net/http"

	"github.com/adhithyan443/olx-clone/backend/internal/dto"
	"github.com/adhithyan443/olx-clone/backend/internal/usecase"
	"github.com/gin-gonic/gin"
)

type CartHandler struct {
	cartUsecase usecase.CartUsecase
}

func NewCartHandler(cartUsecase usecase.CartUsecase) *CartHandler {
	return &CartHandler{
		cartUsecase: cartUsecase,
	}
}

func (h *CartHandler) AddToCart(ctx *gin.Context) {

	var request dto.AddToCartRequest

	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request",
			"error":   err.Error(),
		})
		return
	}

	userID := ctx.GetString("userID")

	err := h.cartUsecase.Add(userID, request.ProductID)

	if err != nil {

		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Product added to cart",
	})
}

func (h *CartHandler) GetCart(ctx *gin.Context) {

	userID := ctx.GetString("userID")

	cartItems, err := h.cartUsecase.Get(userID)

	if err != nil {

		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    cartItems,
	})
}

func (h *CartHandler) Remove(ctx *gin.Context) {

	userID := ctx.GetString("userID")
	productID := ctx.Param("productId")

	err := h.cartUsecase.Remove(userID, productID)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Product removed from cart",
	})
}

func (h *CartHandler) Clear(ctx *gin.Context) {

	userID := ctx.GetString("userID")

	err := h.cartUsecase.Clear(userID)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Cart cleared successfully",
	})
}
