package domain

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey"`
	Name      string    `gorm:"size:100;not null"`
	Email     string    `gorm:"size:100;unique;not null"`
	Password  string    `gorm:"not null"`
	createdAt time.Time
	UpdatedAt time.Time
}

// BeforeCreate is a GORM hook that runs before inserting a new user.
func (u *User) BeforeCreate(tx *gorm.DB) error {
	u.ID = uuid.New()
	return nil
}
