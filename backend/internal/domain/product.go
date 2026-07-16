package domain

import (
	"time"

	"github.com/google/uuid"
)

type Product struct {
	ID uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`

	Title       string  `gorm:"not null"`
	Description string  `gorm:"type:text;not null"`
	Price       float64 `gorm:"not null"`

	Category string `gorm:"not null"`
	ImageURL string

	IsSold bool `gorm:"default:false"`

	UserID uuid.UUID `gorm:"type:uuid;not null"`
	User   User      `gorm:"foreignKey:UserID"`

	CreatedAt time.Time
	UpdatedAt time.Time
}
