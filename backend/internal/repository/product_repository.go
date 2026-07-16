package repository

import (
	"github.com/adhithyan443/olx-clone/backend/internal/domain"
	
	"gorm.io/gorm"
)

type ProductRepository interface {
	Create(product *domain.Product) error
	Update(product *domain.Product) error
	Delete(id string) error
	FindByID(id string) (*domain.Product, error)
	FindAll() ([]domain.Product, error)
	FindByUser(userID string) ([]domain.Product, error)

}

type productRepository struct {
	db *gorm.DB
}

func NewProductRepository(db *gorm.DB) ProductRepository {
	return &productRepository{
		db: db,
	}
}

func (r *productRepository) Create(product *domain.Product) error {
	return r.db.Create(product).Error
}

func (r *productRepository) Update(product *domain.Product) error {
	return r.db.Save(product).Error
}

func (r *productRepository) Delete(id string) error {
	return r.db.Delete(&domain.Product{}, "id = ?", id).Error
}
func (r *productRepository) FindByID(id string) (*domain.Product, error) {

	var product domain.Product

	err := r.db.
		Preload("User").
		First(&product, "id = ?", id).Error

	if err != nil {
		return nil, err
	}
	return &product, nil
}

func (r *productRepository) FindAll() ([]domain.Product, error) {
	var products []domain.Product

	err := r.db.
		Preload("User").
		Where("is_sold = ?", false).
		Find(&products).
		Error

	return products, err
}

func (r *productRepository) FindByUser(userID string) ([]domain.Product, error) {
	var products []domain.Product

	err := r.db.
		Where("user_id = ?", userID).
		Find(&products).
		Error

	return products, err
}

