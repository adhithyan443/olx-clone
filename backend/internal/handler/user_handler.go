package handler

import (
	"net/http"

	"github.com/adhithyan443/olx-clone/backend/internal/domain"
	"github.com/adhithyan443/olx-clone/backend/internal/dto"
	"github.com/adhithyan443/olx-clone/backend/internal/usecase"
	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	userUsecase usecase.UserUsecase
}

func NewUserHandler(userUsecase usecase.UserUsecase) *UserHandler {
	return &UserHandler{
		userUsecase: userUsecase,
	}
}

func (h *UserHandler) Register(c *gin.Context) {
	var user domain.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	err := h.userUsecase.Register(&user)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "User registered successfully",
	})
}

func (h *UserHandler) Login(ctx *gin.Context) {
	var request dto.LoginRequest

	if err := ctx.ShouldBindJSON(&request); err != nil {

		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})

		return
	}

	token, err := h.userUsecase.Login(
		request.Email,
		request.Password,
	)

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Login successful",
		"token":   token,
	})
}

func (h *UserHandler) GetProfile(ctx *gin.Context) {

	userID := ctx.GetString("userID")

	user, err := h.userUsecase.GetProfile(userID)

	if err != nil {

		ctx.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "User not found",
		})
		return
	}

	response := dto.ProfileResponse{
		ID:    user.ID.String(),
		Name:  user.Name,
		Email: user.Email,
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    response,
	})
}
