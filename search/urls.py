from django.conf.urls import patterns, url
import views 

urlpatterns = patterns('',
		url(r'^$', views.search, name = 'search'),
)
