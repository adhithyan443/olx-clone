package usecase

import (
	"errors"

	"github.com/adhithyan443/olx-clone/backend/internal/domain"
	"github.com/adhithyan443/olx-clone/backend/internal/repository"
	"golang.org/x/crypto/bcrypt"
)

type UserUsecase interface {
	Register(user *domain.User) error
	Login(email, password string) (*domain.User, error)
	GetProfile(id string) (*domain.User, error)
}

type userUsecase struct {
	userRepo repository.UserRepository
}

func NewUserUsecase(repo repository.UserRepository) UserUsecase {
	return &userUsecase{
		userRepo: repo,
	}
}

func (u *userUsecase) Register(user *domain.User) error {
	existingUser, err := u.userRepo.FindByEmail(user.Email)

	if err == nil && existingUser != nil {
		return errors.New("email already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	if err != nil {
		return err
	}

	user.Password = string(hashedPassword)

	return u.userRepo.Create(user)
}
