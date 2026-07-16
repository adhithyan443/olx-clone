package usecase

import (
	"errors"

	"github.com/adhithyan443/olx-clone/backend/internal/domain"
	"github.com/adhithyan443/olx-clone/backend/internal/repository"
)

type ProductUsecase interface {
	Create(product *domain.Product) error
	Update(product *domain.Product, userID string) error
	Delete(productID string, userID string) error
	GetByID(id string) (*domain.Product, error)
	GetAll(category string, minPrice, maxPrice float64, sort string) ([]domain.Product, error)
	GetMyProduct(userID string) ([]domain.Product, error)
	Checkout(productIDs []string) error
}

type productUsecase struct {
	productRepo repository.ProductRepository
}

func NewProductUsecase(repo repository.ProductRepository) ProductUsecase {
	return &productUsecase{
		productRepo: repo,
	}
}

func (u *productUsecase) Create(product *domain.Product) error {
	return u.productRepo.Create(product)
}

func (u *productUsecase) GetAll(category string, minPrice, maxPrice float64, sort string) ([]domain.Product, error) {

	return u.productRepo.FindAll(
		category,
		minPrice,
		maxPrice,
		sort,
	)
}

func (u *productUsecase) GetByID(id string) (*domain.Product, error) {
	return u.productRepo.FindByID(id)
}

func (u *productUsecase) Update(product *domain.Product, userID string) error {

	existingProduct, err := u.productRepo.FindByID(product.ID.String())

	if err != nil {
		return err
	}

	if existingProduct.UserID.String() != userID {
		return errors.New("unauthorized")
	}

	return u.productRepo.Update(product)

}

func (u *productUsecase) GetMyProduct(userID string) ([]domain.Product, error) {
	return u.productRepo.FindByUser(userID)
}

func (u *productUsecase) Delete(productID string, userID string) error {
	product, err := u.productRepo.FindByID(productID)

	if err != nil {
		return err
	}

	if product.UserID.String() != userID {
		return errors.New("unauthorized")
	}

	return u.productRepo.Delete(productID)
}

func (u *productUsecase) Checkout(productIDs []string) error {

	return u.productRepo.Checkout(productIDs)

}
