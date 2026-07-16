package handler

import (
	"net/http"
	"strconv"

	"github.com/adhithyan443/olx-clone/backend/internal/domain"
	"github.com/adhithyan443/olx-clone/backend/internal/dto"
	"github.com/adhithyan443/olx-clone/backend/internal/usecase"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type ProductHandler struct {
	productUsecase usecase.ProductUsecase
}

func NewProductHandler(productUsecase usecase.ProductUsecase) *ProductHandler {
	return &ProductHandler{
		productUsecase: productUsecase,
	}
}

func (h *ProductHandler) Create(ctx *gin.Context) {

	var request dto.CreateProductRequest

	if err := ctx.ShouldBindJSON(&request); err != nil {

		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request",
			"error":   err.Error(),
		})

		return
	}

	userID := ctx.GetString("userID")
	id, err := uuid.Parse(userID)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid User ID",
		})

		return
	}

	product := domain.Product{
		Title:       request.Title,
		Description: request.Description,
		Price:       request.Price,
		Category:    request.Category,
		ImageURL:    request.ImageURL,
		UserID:      id,
	}

	err = h.productUsecase.Create(&product)

	if err != nil {

		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})

		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Product created successfully",
	})
}

func (h *ProductHandler) GetAll(ctx *gin.Context) {

	category := ctx.Query("category")

	minPrice, _ := strconv.ParseFloat(
		ctx.DefaultQuery("minPrice", "0"),
		64,
	)

	maxPrice, _ := strconv.ParseFloat(
		ctx.DefaultQuery("maxPrice", "0"),
		64,
	)

	sort := ctx.DefaultQuery("sort", "newest")

	products, err := h.productUsecase.GetAll(
		category, minPrice, maxPrice, sort,
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	var response []dto.ProductResponse

	for _, product := range products {

		response = append(response, dto.ProductResponse{
			ID:          product.ID.String(),
			Title:       product.Title,
			Description: product.Description,
			Price:       product.Price,
			Category:    product.Category,
			ImageURL:    product.ImageURL,
			IsSold:      product.IsSold,
			UserID:      product.UserID.String(),
		})
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    response,
	})
}

func (h *ProductHandler) GetByID(ctx *gin.Context) {

	id := ctx.Param("id")

	product, err := h.productUsecase.GetByID(id)

	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Product Not Found",
		})

		return
	}

	response := dto.ProductResponse{
		ID:          product.ID.String(),
		Title:       product.Title,
		Description: product.Description,
		Price:       product.Price,
		Category:    product.Category,
		ImageURL:    product.ImageURL,
		IsSold:      product.IsSold,
		UserID:      product.UserID.String(),
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    response,
	})
}

func (h *ProductHandler) GetMyProduct(ctx *gin.Context) {

	userID := ctx.GetString("userID")

	products, err := h.productUsecase.GetMyProduct(userID)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	var response []dto.ProductResponse

	for _, product := range products {
		response = append(response, dto.ProductResponse{
			ID:          product.ID.String(),
			Title:       product.Title,
			Description: product.Description,
			Price:       product.Price,
			Category:    product.Category,
			ImageURL:    product.ImageURL,
			IsSold:      product.IsSold,
			UserID:      product.UserID.String(),
		})
	}

	if response == nil {
		response = []dto.ProductResponse{}
	}
	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    response,
	})
}

func (h *ProductHandler) Update(ctx *gin.Context) {
	var request dto.UpdateProductRequest

	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request",
			"error":   err.Error(),
		})
		return
	}

	productID := ctx.Param("id")
	userID := ctx.GetString("userID")

	id, err := uuid.Parse(productID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid Product ID",
		})
		return
	}

	userUUID, err := uuid.Parse(userID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid User ID",
		})
		return
	}

	product := domain.Product{
		ID:          id,
		Title:       request.Title,
		Description: request.Description,
		Price:       request.Price,
		Category:    request.Category,
		ImageURL:    request.ImageURL,
		UserID:      userUUID,
	}

	err = h.productUsecase.Update(&product, userID)

	if err != nil {

		if err.Error() == "unauthorized" {
			ctx.JSON(http.StatusForbidden, gin.H{
				"success": false,
				"message": "You are not allowed to update this products",
			})
			return
		}

		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Product updated successfully",
	})
}

func (h *ProductHandler) Delete(ctx *gin.Context) {
	productID := ctx.Param("id")
	userID := ctx.GetString("userID")

	err := h.productUsecase.Delete(productID, userID)

	if err != nil {

		if err.Error() == "unauthorized" {
			ctx.JSON(http.StatusForbidden, gin.H{
				"success": false,
				"message": "You are not allowed to delete this product",
			})
			return
		}

		ctx.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Product deleted successfully",
	})

}

func (h *ProductHandler) Checkout(ctx *gin.Context) {

	var request dto.CheckoutRequest

	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request",
			"error":   err.Error(),
		})
		return
	}

	err := h.productUsecase.Checkout(request.ProductIDs)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Checkout successful",
	})
}
