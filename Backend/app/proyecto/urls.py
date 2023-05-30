from django.urls import path

from .viewsets import (grupoInvestigacionList,
                       grupoInvestigacionRetrieveUpdateDestroy,
                       investigadorList, investigadorRetrieveUpdateDestroy,
                       posgradoList, posgradoRetrieveUpdateDestroy,
                       pregradoList, pregradoRetrieveUpdateDestroy,
                       ubicacionList, ubicacionRetrieveUpdateDestroy)

urlpatterns = [
    path('investigador', investigadorList.as_view(), name='create-investigador-list'),
    path('grupoinvestigacion', grupoInvestigacionList.as_view(), name='create-grupoinvestigacion-list'),
    path('posgrado', posgradoList.as_view(), name='create-posgrado-list'),
    path('pregrado', pregradoList.as_view(), name='create-pregrado-list'),
    path('ubicacion', ubicacionList.as_view(), name='create-ubicacion-list'), 
    path('investigador/<int:pk>', investigadorRetrieveUpdateDestroy.as_view(), name='investigador-detail'),
    path('grupoinvestigacion/<int:pk>', grupoInvestigacionRetrieveUpdateDestroy.as_view(), name='grupoinvestigacion-detail'),
    path('posgrado/<int:pk>', posgradoRetrieveUpdateDestroy.as_view(), name='posgrado-detail'),
    path('pregrado/<int:pk>', pregradoRetrieveUpdateDestroy.as_view(), name='pregrado-detail'),
    path('ubicacion/<int:pk>', ubicacionRetrieveUpdateDestroy.as_view(), name='ubicacion-detail'),
]




