package dto

type CheckoutRequest struct {
	ProductIDs []string `json:"productIds" binding:"required"`
}

type AddToCartRequest struct {
	ProductID string `json:"productId" binding:"required"`
}