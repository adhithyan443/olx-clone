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
	FindAll(search, category string, minPrice, maaxPrice float64, sort string) ([]domain.Product, error)
	FindByUser(userID string) ([]domain.Product, error)
	Checkout(productIDs []string) error
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

func (r *productRepository) FindAll(search, category string, minPrice, maxPrice float64, sort string) ([]domain.Product, error) {
	var products []domain.Product

	query := r.db.Where("is_sold = ?", false)

	// Search
	if search != "" {
		like := "%" + search + "%"

		query = query.Where(
			"title ILIKE ? OR description ILIKE ? OR category ILIKE ?",
			like,
			like,
			like,
		)
	}

	//category filter
	if category != "" {
		query = query.Where("category = ?", category)
	}

	//Price Filter
	if minPrice > 0 {
		query = query.Where("price >= ?", minPrice)
	}

	if maxPrice > 0 {
		query = query.Where("price <= ?", maxPrice)
	}

	//Sorting

	switch sort {
	case "price_asc":
		query = query.Order("price ASC")

	case "price_desc":
		query = query.Order("price DESC")

	case "newest":
		query = query.Order("created_at DESC")

	case "oldest":
		query = query.Order("created_at ASC")

	default:
		// Default sorting
		query = query.Order("created_at DESC")
	}

	err := query.Find(&products).Error

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

func (r *productRepository) Checkout(productIDs []string) error {
	return r.db.Model(&domain.Product{}).
		Where("id IN ?", productIDs).
		Update("is_sold", true).Error
}
