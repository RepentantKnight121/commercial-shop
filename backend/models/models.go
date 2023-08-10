package models

import (
	"time"
)

type Account struct {
	Username    string `json:"username"    binding:"required"`
	RoleId      int    `json:"roleId"      binding:"required"`
	Password    string `json:"password"    binding:"required"`
	DisplayName string `json:"displayName" binding:"required"`
	Email       string `json:"email"       binding:"required"`
	Active      int    `json:"active"      binding:"required"`
	Session     []byte `json:"session"     binding:"required"`
}

type AccountRole struct {
	Id          int    `json:"id"          binding:"required"`
	Description string `json:"description" binding:"required"`
}

type BillDetail struct {
	Id         int    `json:"id"         binding:"required"`
	BillId     int    `json:"billId"     binding:"required"`
	ProductId  string `json:"productId"  binding:"required"`
	DiscountId string `json:"discountId" binding:"required"`
	Amount     int    `json:"amount"     binding:"required"`
}

type BillInfo struct {
	Id              int       `json:"id"              binding:"required"`
	AccountUsername string    `json:"accountUsername" binding:"required"`
	Name            string    `json:"name"            binding:"required"`
	Email           string    `json:"email"           binding:"required"`
	Phone           string    `json:"phone"           binding:"required"`
	Address         string    `json:"address"         binding:"required"`
	Date            time.Time `json:"date"            binding:"required"`
	Status          int       `json:"status"          binding:"required"`
	Payment         int       `json:"payment"         binding:"required"`
}

type BillStatus struct {
	Id          int    `json:"id"          binding:"required"`
	Description string `json:"description" binding:"required"`
}

type Category struct {
	Id   string `json:"id"   binding:"required"`
	Name string `json:"name" binding:"required"`
}

type Customer struct {
	Id              string `json:"id"              binding:"required"`
	AccountUsername string `json:"accountUsername" binding:"required"`
	Name            string `json:"name"            binding:"required"`
	Phone           string `json:"phone"           binding:"required"`
	Address         string `json:"address"         binding:"required"`
}

type Discount struct {
	Id          string    `json:"id"          binding:"required"`
	Description string    `json:"description" binding:"required"`
	Percent     float64   `json:"percent"     binding:"required"`
	DateStart   time.Time `json:"dateStart"   binding:"required"`
	DateEnd     time.Time `json:"dateEnd"     binding:"required"`
}

type Product struct {
	Id          string `json:"id"          binding:"required"`
	CategoryId  string `json:"categoryId"  binding:"required"`
	Name        string `json:"name"        binding:"required"`
	Fabric      string `json:"fabric"      binding:"required"`
	Price       int    `json:"price"       binding:"required"`
	Description string `json:"description" binding:"required"`
}

type ProductDetail struct {
	Id        string `json:"id"          binding:"required"`
	ProductId string `json:"productId"   binding:"required"`
	Color     string `json:"color"       binding:"required"`
	Size      string `json:"size"        binding:"required"`
	Amount    int    `json:"amount"      binding:"required"`
}

type ProductWithImage struct {
	Id         string `json:"id"          binding:"required"`
	CategoryId string `json:"categoryId"  binding:"required"`
	Name       string `json:"name"        binding:"requizred"`
	Price      int    `json:"price"       binding:"required"`
	Amount     int    `json:"amount"      binding:"required"`
	Image      []byte `json:"image"       binding:"required"`
}

type ProductImage struct {
	Id        string `json:"id"        binding:"required"`
	ProductId string `json:"productId" binding:"required"`
	Image     []byte `json:"image"     binding:"required"`
}
