package handler

import (
	"net/http"
	"github.com/adhithyan443/olx-clone/backend/internal/domain"
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

	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message" : err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success" : true,
		"message" : "User registered successfully",
	})
}
