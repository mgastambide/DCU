const data = [
    { id: 0, word: 'abeja', prox_sem:'avispa', distant_sem: 'mariposa', fonol:'oveja',
        definition:'Insecto que produce cera y miel.', sound: 'abeja.mp3',
        image: 'https://i.pinimg.com/originals/09/42/7b/09427b209b54ef83be148fc7c6bbbf71.png',
        image_prox_sem: 'http://3.bp.blogspot.com/-lhX-Pv63I5I/VjI6gT4Mi5I/AAAAAAAAXD4/pQKPM84tVRY/s1600/Desinfecciones_2Bavispas_ZARAGOZA2.png',
        image_distant_sem: 'https://assets.stickpng.com/images/5862396a31349e0568ad89c0.png',
        image_fonol: 'https://userscontent2.emaze.com/images/89084ede-3044-424e-9fa0-753d7ae2411a/82f48d98-b700-4fe3-a104-f10469a1853a.png',
    },
    { id: 1, word: 'abuelo', prox_sem:'tío', distant_sem: 'padre', fonol:'abuela',
        definition:'Padre de la madre ó del padre.', sound: 'abuelo.mp3',
        image: 'https://cdn.pixabay.com/photo/2016/10/13/22/48/grandfather-1739007_960_720.png',
        image_prox_sem: 'https://replaycolombia.vteximg.com.br/arquivos/ids/173408-380-733/-Jeans-Para-Hombre--Replay15.jpg?v=636886107095230000',
        image_distant_sem: 'https://fotografias.antena3.com/clipping/cmsimages01/2020/07/21/50A45B0A-59A5-4693-ABFE-CBC7FE467909.png',
        image_fonol: 'https://www.vippng.com/png/full/390-3902619_abuelos-abuela-anciana-cuidar-a-una-madre.png',
    },
    { id: 2, word: 'acelga', prox_sem:'lechuga', distant_sem: 'espinaca', fonol:'huelga',
        definition:'(Sin definicion)', sound: 'acelga.mp3',
        image: 'https://verduleriatioyalberto.com.ar/wp-content/uploads/2020/10/file.png',
        image_prox_sem: 'https://ankamapu.cl/wp-content/uploads/2018/07/lechuga-sierra-1-1100x1100.png',
        image_distant_sem: 'https://sanate.com.ar/wp-content/uploads/2020/05/espinaca-agroecologica-fresca.png',
        image_fonol: 'https://www.federacionanarquista.net/wp-content/uploads/2020/11/amplio-seguimiento-de-la-huelga-de-siatas-11-26-2020-600x245.png',
    },
    { id: 3, word: 'dentista', prox_sem:'especialista', distant_sem: 'cirujano', fonol:'dietista',
        definition:'Profesional que se especializa en las enfermedades de los dientes y su curación.', sound: 'dentista.mp3',
        image: 'https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_416,h_755/http://midentistasly.com.mx/wp-content/uploads/dentista-servicios-sly.png',
        image_prox_sem: 'https://www.clinicadentalmontornes.com/wp-content/uploads/2015/12/doctor-writing.png',
        image_distant_sem: 'https://www.clinicadual.es/cms/wp-content/uploads/curriculum-jorge-amorrortu-clinica-dual-valencia.png',
        image_fonol: 'http://nutricionistasalinas.es/wp-content/uploads/2018/03/woman-image2.png',
    },
    { id: 4, word: 'dentífrico', prox_sem:'cepillo', distant_sem: 'bicarbonato', fonol:'dental',
        definition:'Crema dental o pasta de dientes, se usa para la limpieza dental.', sound: 'dentrifico.mp3',
        image: 'https://sabermas.umich.mx/images/stories/34/billionphotos-1631112.png',
        image_prox_sem: 'https://www.sunstargum.com/content/dam/sunstar-europe/gum/pack-shots/toothbrush/technique-pro/P525-GUM-Technique-Pro-Compact-Soft-Blue-Angle.png/_jcr_content/renditions/cq5dam.thumbnail.360.600.png',
        image_distant_sem: 'https://biodinamica.com.br/wp-content/uploads/2018/11/bicarbonato-p.png',
        image_fonol: 'https://axiomaestudidental.com/wp-content/uploads/2018/03/protesis-dental-fija.png',
    },
    { id: 5, word: 'tallarines', prox_sem:'(No definida)', distant_sem: '(No definida)', fonol:'(No definida)',
        definition:'Tipo de pasta en forma de tiras finas', sound: 'tallarines.mp3',
        image: 'https://i.pinimg.com/originals/94/0a/ba/940aba05b6111d54bbd69067ddbf28df.png',
        image_prox_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_distant_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_fonol: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
    },
    { id: 6, word: 'talco', prox_sem:'(No definida)', distant_sem: '(No definida)', fonol:'(No definida)',
        definition:'Polvo de este mineral usado en dermatología,para el cuidado de pieles delicadas.', sound: 'talco.mp3',
        image: 'https://www.rexona.com/content/dam/unilever/rexona/argentina/pack_shot/7791293027760-973234-png.png',
        image_prox_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_distant_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_fonol: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
    },
    { id: 7, word: 'melón', prox_sem:'(No definida)', distant_sem: '(No definida)', fonol:'(No definida)',
        definition:'Planta con tallos rastreros y fruto de gran dimensión con cáscara amarilla; con abundante pulpa aguanosa Y muchas pepitas amarillas.', sound: 'melon.mp3',
        image: 'https://www.frutality.es/wp-content/uploads/melon.png',
        image_prox_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_distant_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_fonol: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
    },
    { id: 8, word: 'liebre', prox_sem:'(No definida)', distant_sem: '(No definida)', fonol:'(No definida)',
        definition:'(Sin definición)', sound: 'liebre.mp3',
        image: 'https://www.omniocio.es/multiaventura/wp-content/uploads/2011/05/liebre.png',
        image_prox_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_distant_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_fonol: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
    },
    { id: 9, word: 'llave', prox_sem:'(No definida)', distant_sem: '(No definida)', fonol:'(No definida)',
        definition:'Instrumento que sirve para abrir ó cerrar una cerradura.', sound: 'llave.mp3',
        image: 'https://cerraduras.pro/wp-content/uploads/2020/06/Llave-de-sierra-1.png',
        image_prox_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_distant_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_fonol: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
    },
    { id: 10, word: 'orquídea', prox_sem:'(No definida)', distant_sem: '(No definida)', fonol:'(No definida)',
        definition:'(Sin definición)', sound: 'orquidea.mp3',
        image: 'https://www.compo.es/.imaging/focus/dam/global/freely-composed-only-for-crop-teaser/orchidee_freigestellt.png/jcr:content.png?x=48&y=54',
        image_prox_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_distant_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_fonol: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
    },
    { id: 11, word: 'reloj', prox_sem:'(No definida)', distant_sem: '(No definida)', fonol:'(No definida)',
        definition:'Máquina que mide el tiempo.', sound: 'reloj.mp3',
        image: 'https://d2r9epyceweg5n.cloudfront.net/stores/953/675/products/sb11-25f0ee123aa2200bff16124841599551-1024-1024.png',
        image_prox_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_distant_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_fonol: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
    },
    { id: 12, word: 'saxo', prox_sem:'(No definida)', distant_sem: '(No definida)', fonol:'(No definida)',
        definition:'Instrumento musical de viento, de metal, con boquilla de madera y varias llaves.', sound: 'saxo.mp3',
        image: 'https://www.musicalmollet.com/wp-content/uploads/Saxo-alto-VS-MA300.png',
        image_prox_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_distant_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_fonol: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
    },
    { id: 13, word: 'serpiente', prox_sem:'(No definida)', distant_sem: '(No definida)', fonol:'(No definida)',
        definition:'Reptil que se arrastra.', sound: 'serpiente.mp3',
        image: 'https://pngimg.com/uploads/snake/snake_PNG4057.png',
        image_prox_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_distant_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_fonol: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
    },
    { id: 14, word: 'tigre', prox_sem:'(No definida)', distant_sem: '(No definida)', fonol:'(No definida)',
        definition:'Felino de gran porte de pelaje amarillento, con rayas negras.', sound: 'tigre.mp3',
        image: 'https://www.pliniocorreadeoliveira.info/Tigre%20saltando%20-3.png',
        image_prox_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_distant_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_fonol: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
    },
    { id: 15, word: 'trombón', prox_sem:'(No definida)', distant_sem: '(No definida)', fonol:'(No definida)',
        definition:'Instrumento musical de viento, especie de trompeta grande.', sound: 'trombon.mp3',
        image: 'https://i.pinimg.com/originals/de/6e/80/de6e807bc4a87e334f670349c58d3d95.png',
        image_prox_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_distant_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_fonol: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
    },
    { id: 16, word: 'zuecos', prox_sem:'(No definida)', distant_sem: '(No definida)', fonol:'(No definida)',
        definition:'Calzado hecho en una única pieza de madera en el que se introduce el pie calzado, generalmente para proteger el pie y el calzado de la lluvia o el barro; en algunos países es el calzado empleado por campesinos o pastores.', sound: 'zuecos.mp3',
        image: 'https://i.pinimg.com/originals/8f/cc/9c/8fcc9ca01fa9b7614f1de8401e3817da.png',
        image_prox_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_distant_sem: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
        image_fonol: 'https://images.vexels.com/media/users/3/128417/isolated/preview/d437da2a54918895cf59a3362a0099ec-icono-plano-de-aacute-lbum-de-fotos-by-vexels.png',
    },
]

export default data;