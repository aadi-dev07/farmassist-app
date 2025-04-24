
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image, Upload, CheckCircle, AlertCircle } from 'lucide-react';

const DiseaseDetection: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!image) {
      setError("Please upload an image first");
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      // Mock result for demonstration
      setResult({
        disease: "Early Blight",
        confidence: 94,
        plant: "Tomato",
        treatment: [
          "Remove and destroy affected leaves",
          "Apply copper-based fungicide",
          "Ensure proper spacing between plants for air circulation",
          "Water at the base of plants, avoiding leaf wetness"
        ]
      });
    }, 2000);
  };

  return (
    <section id="detection" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            AI-Powered <span className="text-farm-green-600">Disease Detection</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Upload an image of your plant and our AI will identify diseases and provide treatment recommendations.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="flex flex-col items-center justify-center p-6 h-full">
            <div className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg border-muted-foreground/25 bg-farm-green-100">
              {image ? (
                <div className="w-full relative">
                  <img src={image} alt="Uploaded plant" className="w-full h-auto max-h-80 object-contain rounded-lg" />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 bg-white"
                    onClick={() => setImage(null)}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Image className="w-12 h-12 text-farm-green-600 mb-4" />
                  <p className="mb-2 text-sm font-medium">Upload an image of your plant</p>
                  <p className="text-xs text-muted-foreground mb-4">JPG, PNG or WEBP (max 5MB)</p>
                  <label htmlFor="image-upload">
                    <div className="inline-flex h-9 items-center justify-center rounded-md bg-farm-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-farm-green-700 cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
            </div>
            {error && (
              <div className="mt-4 text-red-500 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" /> {error}
              </div>
            )}
            <Button 
              className="mt-6 bg-farm-green-600 hover:bg-farm-green-700"
              onClick={handleAnalyze}
              disabled={!image || isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
            </Button>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6">Analysis Results</h3>
              
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-farm-green-600 mb-4"></div>
                  <p>Analyzing your plant image...</p>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-center bg-green-100 text-green-800 rounded-md p-3">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <p className="font-medium">Analysis Complete</p>
                  </div>
                  
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-farm-green-100 p-4 rounded-md">
                        <p className="text-sm text-muted-foreground">Identified Plant</p>
                        <p className="font-semibold">{result.plant}</p>
                      </div>
                      <div className="bg-farm-green-100 p-4 rounded-md">
                        <p className="text-sm text-muted-foreground">Disease</p>
                        <p className="font-semibold">{result.disease}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-1">Confidence Level</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-farm-green-600 h-2.5 rounded-full" 
                          style={{ width: `${result.confidence}%` }}
                        ></div>
                      </div>
                      <p className="text-right text-xs mt-1">{result.confidence}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Recommended Treatment:</h4>
                    <ul className="space-y-2">
                      {result.treatment.map((treatment: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-farm-green-100 text-farm-green-600 mr-2">
                            {index + 1}
                          </span>
                          <span>{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <p>Upload and analyze an image to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DiseaseDetection;
