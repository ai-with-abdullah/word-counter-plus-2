import { Card, CardContent } from '@/components/ui/card';
import { FaInfoCircle } from 'react-icons/fa';

export default function Admin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <FaInfoCircle className="w-16 h-16 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Contact Storage Disabled</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Contact message storage has been completely removed from this application. 
            All contact messages are now sent directly via WhatsApp.
          </p>
          <p className="text-muted-foreground">
            No user data is stored in the database.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}