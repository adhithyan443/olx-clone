package repository

import (
	"errors"

	"github.com/adhithyan443/olx-clone/backend/internal/domain"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CartRepository interface {
	Add(userID, productID string) error
	GetByUser(userID string) ([]domain.CartItem, error)
	Remove(userID, productID string) error
	Clear(userID string) error
}

type cartRepository struct {
	db *gorm.DB
}

func NewCartRepository(db *gorm.DB) CartRepository {
	return &cartRepository{
		db: db,
	}
}

func (r *cartRepository) Add(userID, productID string) error {

	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return err
	}

	productUUID, err := uuid.Parse(productID)
	if err != nil {
		return err
	}

	var product domain.Product

	err = r.db.First(&product, "id = ?", productUUID).Error
	if err != nil {
		return err
	}

	if product.UserID == userUUID {
		return errors.New("you cannot add your own product")
	}

	if product.IsSold {
		return errors.New("product is already sold")
	}

	var existingCart domain.CartItem

	err = r.db.
		Where("user_id = ? AND product_id = ?", userUUID, productUUID).
		First(&existingCart).Error

	if err == nil {
		return errors.New("product already exists in cart")
	}

	if err != gorm.ErrRecordNotFound {
		return err
	}

	cartItem := domain.CartItem{
		UserID:    userUUID,
		ProductID: productUUID,
	}

	return r.db.Create(&cartItem).Error
}

func (r *cartRepository) GetByUser(userID string) ([]domain.CartItem, error) {

	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return nil, err
	}

	var cartItems []domain.CartItem

	err = r.db.
		Preload("Product").
		Where("user_id = ?", userUUID).
		Find(&cartItems).Error

	if err != nil {
		return nil, err
	}

	return cartItems, nil
}

func (r *cartRepository) Remove(userID, productID string) error {

	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return err
	}

	productUUID, err := uuid.Parse(productID)
	if err != nil {
		return err
	}

	return r.db.
		Where("user_id = ? AND product_id = ?", userUUID, productUUID).
		Delete(&domain.CartItem{}).Error
}

func (r *cartRepository) Clear(userID string) error {

	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return err
	}

	return r.db.
		Where("user_id = ?", userUUID).
		Delete(&domain.CartItem{}).Error
}
