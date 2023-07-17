import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

function DescriptionCard({page}) {
    return (
        <Card sx={{ height: 400, width: 320 }}>
            <CardCover>
                <img
                    src={page.image || 'https://placehold.co/400?text=No Image'}
                    alt={page.title}
                />
            </CardCover>
            <CardCover
                sx={{
                    background:
                        'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px),' +
                        'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 400px)',
                }}
            />
            <CardContent sx={{ justifyContent: 'flex-end' }}>
                <Typography level="h2" fontSize="lg" textColor="#fff" component="div" variant="h7">
                    {page.title}
                </Typography>
                <Typography textColor="#fff" component="div">
                    {page.rank.toFixed(2)}%
                </Typography>
            </CardContent>
        </Card>
    );
}

export default DescriptionCard;