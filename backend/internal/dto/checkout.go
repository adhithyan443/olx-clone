package dto

type CheckoutRequest struct {
	ProductIDs []string `json:"productIds" binding:"required"`
}
