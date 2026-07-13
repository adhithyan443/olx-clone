package usecase

import (
	"errors"

	"github.com/adhithyan443/olx-clone/backend/internal/domain"
	"github.com/adhithyan443/olx-clone/backend/internal/repository"
	"github.com/adhithyan443/olx-clone/backend/internal/utils"
	"golang.org/x/crypto/bcrypt"
)

type UserUsecase interface {
	Register(user *domain.User) error
	Login(email, password string) (*domain.User, string, error)
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

func (u *userUsecase) Login(email, password string) (*domain.User, string, error) {

	user, err := u.userRepo.FindByEmail(email)

	if err != nil {
		return nil, "", errors.New("invalid email or password")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	if err != nil {
		return nil, "", errors.New("invalid email or password")
	}

	token, err := utils.GenerateToken(
		user.ID.String(),
		user.Email,
	)

	if err != nil {
		return nil, "", err
	}

	return user, token, nil

}

func (u *userUsecase) GetProfile(id string) (*domain.User, error) {

	user, err := u.userRepo.FindByID(id)

	if err != nil {
		return nil, err
	}

	return user, nil
}
