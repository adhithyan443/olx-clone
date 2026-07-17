package usecase

import (
	"github.com/adhithyan443/olx-clone/backend/internal/domain"
	"github.com/adhithyan443/olx-clone/backend/internal/repository"
)

type CartUsecase interface {
	Add(userID, productID string) error
	Get(userID string) ([]domain.CartItem, error)
	Remove(userID, productID string) error
	Clear(userID string) error
}

type cartUsecase struct {
	cartRepo repository.CartRepository
}

func NewCartUsecase(cartRepo repository.CartRepository) CartUsecase {
	return &cartUsecase{
		cartRepo: cartRepo,
	}
}

func (u *cartUsecase) Add(userID, productID string) error {
	return u.cartRepo.Add(userID, productID)
}

func (u *cartUsecase) Get(userID string) ([]domain.CartItem, error) {
	return u.cartRepo.GetByUser(userID)
}




func (u *cartUsecase) Remove(userID, productID string) error {
	return u.cartRepo.Remove(userID, productID)
}


func (u *cartUsecase) Clear(userID string) error {
	return u.cartRepo.Clear(userID)
}