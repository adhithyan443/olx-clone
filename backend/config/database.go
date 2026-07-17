package config

import (
	"fmt"
	"log"
	"os"

	"github.com/adhithyan443/olx-clone/backend/internal/domain"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_SSLMODE"),
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Database connection failed: ", err)
	}


	DB = db

	log.Println("PostgreSQL connected sucessfully")
}

func MigrateDatabase() error{
	return  DB.AutoMigrate(
		&domain.User{},
		&domain.Product{},
		&domain.CartItem{},
	)
}