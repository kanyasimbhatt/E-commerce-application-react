import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material"
import type { Product } from "./ViewAllProducts"
import { useVisualMode } from "../Navbar/VisualModeProvider"

type ChildrenType = {
    filteredProducts : Product[],
    shareFunction: (productId: number) => void,
    productFunction: (productId: string) => void
}

const ShowProducts = ({filteredProducts, shareFunction, productFunction}: ChildrenType) => {
    const {darkMode} = useVisualMode();
  return (
    <Stack
        display={'flex'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        flexGrow={1}
        gap={'50px'}
        justifyContent={'center'}
        marginTop={'100px'}
        marginBottom={'50px'}
        
      >
        {filteredProducts.map((product: Product) => (
          <Card
            sx={{ maxWidth: 300, boxShadow: '0 0 10px  #bfbfbf'}}
            key={product.id}
            
            
          >
            <CardMedia
              sx={{ height: 340 }}
              image={product.images[0]}
              title={product.title}
            />
            <CardContent sx={{ height: 160 }}>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {product.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => shareFunction(product.id)}
              >
                Share
              </Button>
              <Button
                size="small"
                onClick={() => productFunction(`${product.id}`)}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
  )
}

export default ShowProducts
