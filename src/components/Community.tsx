
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessageSquare,
  User,
  Clock 
} from 'lucide-react';

const Community: React.FC = () => {
  const forumPosts = [
    {
      id: 1,
      title: "How to combat tomato blight naturally?",
      author: "GreenThumb",
      time: "3 hours ago",
      replies: 12,
      tags: ["Disease", "Organic", "Tomatoes"],
      excerpt: "I'm seeing early signs of blight on my tomato plants and want to avoid chemical treatments. Has anyone had success with natural remedies?"
    },
    {
      id: 2,
      title: "Best companion plants for pest control?",
      author: "FarmFresh",
      time: "8 hours ago",
      replies: 24,
      tags: ["Pest Control", "Companion Planting"],
      excerpt: "Looking to integrate more companion planting in my garden to reduce pest problems. What combinations have worked well for you?"
    },
    {
      id: 3,
      title: "Soil improvement tips for clay soil",
      author: "DirtLover",
      time: "1 day ago",
      replies: 18,
      tags: ["Soil", "Improvement"],
      excerpt: "My garden has heavy clay soil that doesn't drain well. I've tried adding compost but still having issues. Any suggestions?"
    },
    {
      id: 4,
      title: "When to harvest butternut squash?",
      author: "HarvestHappy",
      time: "2 days ago",
      replies: 7,
      tags: ["Harvest", "Squash"],
      excerpt: "It's my first time growing butternut squash and I'm not sure when they're ready to harvest. What signs should I look for?"
    },
  ];
  
  const experts = [
    {
      name: "Dr. Maria Rodriguez",
      role: "Plant Pathologist",
      expertise: ["Disease Identification", "Treatment Planning", "Preventative Care"],
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&h=100&auto=format&fit=crop"
    },
    {
      name: "James Chen",
      role: "Organic Farming Specialist",
      expertise: ["Sustainable Practices", "Organic Pest Control", "Soil Management"],
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&h=100&auto=format&fit=crop"
    },
    {
      name: "Dr. Amara Okafor",
      role: "Agricultural Scientist",
      expertise: ["Crop Rotation", "Yield Optimization", "Climate Adaptation"],
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop"
    }
  ];

  return (
    <section id="community" className="py-16 md:py-24 bg-farm-green-100">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Join Our <span className="text-farm-green-600">Farming Community</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Connect with fellow farmers, share experiences, and get advice from agricultural experts.
          </p>
        </div>

        <Tabs defaultValue="forum" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="forum" className="text-sm md:text-base px-4 md:px-8">
                <MessageSquare className="mr-2 h-4 w-4" />
                Community Forum
              </TabsTrigger>
              <TabsTrigger value="experts" className="text-sm md:text-base px-4 md:px-8">
                <Users className="mr-2 h-4 w-4" />
                Meet Our Experts
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="forum">
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold">Recent Discussions</h3>
                <p className="text-muted-foreground">Join the conversation or start your own thread</p>
              </div>
              <Button className="bg-farm-green-600 hover:bg-farm-green-700">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start New Discussion
              </Button>
            </div>
            
            <div className="grid gap-6">
              {forumPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg font-medium hover:text-farm-green-600 cursor-pointer">
                        {post.title}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">{post.replies}</span> replies
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-farm-green-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-muted-foreground mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span className="font-medium">{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline" className="border-farm-green-500 text-farm-green-600 hover:bg-farm-green-50">
                View More Discussions
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="experts">
            <div className="grid gap-8 md:grid-cols-3">
              {experts.map((expert, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-[3/2] relative">
                    <img 
                      src={expert.image} 
                      alt={expert.name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-1">{expert.name}</h3>
                    <p className="text-farm-green-600 font-medium mb-3">{expert.role}</p>
                    
                    <h4 className="text-sm font-semibold mb-2">Areas of Expertise:</h4>
                    <ul className="space-y-1">
                      {expert.expertise.map((item, i) => (
                        <li key={i} className="text-sm flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-farm-green-500 mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full mt-4 bg-farm-green-600 hover:bg-farm-green-700">
                      Ask a Question
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-muted-foreground mb-4">
                Our community of experts is growing! Join us as a verified expert to share your knowledge.
              </p>
              <Button variant="outline" className="border-farm-green-500 text-farm-green-600 hover:bg-farm-green-50">
                Apply to Become an Expert
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Community;
