package routes

import (
	"github.com/gin-gonic/gin"

	"commercial-shop.com/controllers"
)

func addProductWithImageRoutes(rg *gin.RouterGroup) {
	route := rg.Group("/productwithimage")

	route.GET("", controllers.GetAllProductWithImage)
}
