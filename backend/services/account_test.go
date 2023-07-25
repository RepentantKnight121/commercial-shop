package services

import (
	"testing"

	"commercial-shop.com/models"
)

func Test_CreateAccount(t *testing.T) {
	// Create service and assign to data
	data := AccountService{
		Items: []models.Account{{
			Username:    "Khoa999",
			Password:    "1232",
			DisplayName: "Khoa",
			RoleId:      1,
		}},
	}

	// Execute method and if error happen send error
	err := data.Create()
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_DeleteAccount(t *testing.T) {
	// Create service and assign to data
	data := AccountService{Items: []models.Account{{
		Username: "Khoa999",
	}}}

	// Execute method and if error happen send error
	err := data.Delete()
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_GetAccount(t *testing.T) {
	// Create service and assign to data
	data := AccountService{Items: []models.Account{{
		Username: "Khoa999",
	}}}

	// Execute method and if error happen send error
	login_flag := false
	userinfo_flag := false
	err := data.Get(&login_flag, &userinfo_flag)
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_GetAllAccount(t *testing.T) {
	// Create limit, page, service and assign to data
	limit := 10
	page := 1
	data := AccountService{}

	// Execute method and if error happen send error
	err := data.GetAll(&limit, &page)
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_UpdateAccount(t *testing.T) {
	// Create service and assign to data
	data := AccountService{
		Items: []models.Account{{
			Username:    "Khoa999",
			Password:    "123",
			DisplayName: "Updated",
			RoleId:      0,
		}},
	}

	// Get passing values options
	password_option, displayname_option, roleid_option, email_option, active := true, true, true, true, true
	if data.Items[0].Password == "" {
		password_option = false
	}
	if data.Items[0].DisplayName == "" {
		displayname_option = false
	}
	if data.Items[0].RoleId == 0 {
		roleid_option = false
	}
	if data.Items[0].Email == "" {
		email_option = false
	}
	if data.Items[0].Active == -1 {
		active = false
	}

	// Execute method and if error happen send error
	err := data.Update(&password_option, &displayname_option, &roleid_option, &email_option, &active)
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}
