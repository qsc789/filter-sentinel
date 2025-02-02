import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { User } from '@supabase/supabase-js'

export default function Index() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const platforms = [
    {
      name: "GitHub",
      status: "Operational",
      uptime: "99.99%",
      responseTime: "120ms",
      incidents: [
        {
          date: "2024-01-15",
          description: "API Latency Issues",
          duration: "45 minutes",
          status: "Resolved",
        },
        {
          date: "2024-01-10",
          description: "Search Service Degradation",
          duration: "30 minutes",
          status: "Resolved",
        },
      ],
      metrics: {
        daily: [
          { date: "2024-01-15", uptime: 99.9, responseTime: 125 },
          { date: "2024-01-14", uptime: 100, responseTime: 118 },
          { date: "2024-01-13", uptime: 99.95, responseTime: 122 },
        ],
        weekly: [
          { date: "Week 2", uptime: 99.95, responseTime: 121 },
          { date: "Week 1", uptime: 99.98, responseTime: 119 },
        ],
        monthly: [
          { date: "January", uptime: 99.97, responseTime: 120 },
          { date: "December", uptime: 99.99, responseTime: 118 },
        ],
      },
    },
    {
      name: "AWS",
      status: "Partial Outage",
      uptime: "99.95%",
      responseTime: "150ms",
      incidents: [
        {
          date: "2024-01-14",
          description: "EC2 Instance Connectivity",
          duration: "2 hours",
          status: "Investigating",
        },
      ],
      metrics: {
        daily: [
          { date: "2024-01-15", uptime: 99.8, responseTime: 155 },
          { date: "2024-01-14", uptime: 99.5, responseTime: 160 },
          { date: "2024-01-13", uptime: 100, responseTime: 148 },
        ],
        weekly: [
          { date: "Week 2", uptime: 99.8, responseTime: 152 },
          { date: "Week 1", uptime: 99.9, responseTime: 149 },
        ],
        monthly: [
          { date: "January", uptime: 99.85, responseTime: 151 },
          { date: "December", uptime: 99.95, responseTime: 148 },
        ],
      },
    },
    {
      name: "Google Cloud",
      status: "Operational",
      uptime: "99.98%",
      responseTime: "135ms",
      incidents: [],
      metrics: {
        daily: [
          { date: "2024-01-15", uptime: 100, responseTime: 134 },
          { date: "2024-01-14", uptime: 99.98, responseTime: 136 },
          { date: "2024-01-13", uptime: 100, responseTime: 133 },
        ],
        weekly: [
          { date: "Week 2", uptime: 99.99, responseTime: 134 },
          { date: "Week 1", uptime: 100, responseTime: 135 },
        ],
        monthly: [
          { date: "January", uptime: 99.995, responseTime: 134 },
          { date: "December", uptime: 100, responseTime: 135 },
        ],
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">
                Platform Monitor
              </span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <ThemeToggle />
              {user ? (
                <Button variant="ghost" onClick={() => navigate('/profile')}>
                  Profile
                </Button>
              ) : (
                <Button variant="ghost" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform) => (
            <Card key={platform.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {platform.name}
                </CardTitle>
                <div
                  className={`h-4 w-4 rounded-full ${
                    platform.status === "Operational"
                      ? "bg-green-500"
                      : platform.status === "Partial Outage"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platform.status}</div>
                <p className="text-xs text-muted-foreground">
                  Uptime: {platform.uptime} | Response Time: {platform.responseTime}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Details</CardTitle>
            </CardHeader>
            <CardContent>
              {platforms.map((platform) => (
                <div key={platform.name} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-semibold mb-4">{platform.name}</h3>
                  <Tabs defaultValue="metrics" className="w-full">
                    <TabsList>
                      <TabsTrigger value="metrics">Metrics</TabsTrigger>
                      <TabsTrigger value="incidents">Incidents</TabsTrigger>
                    </TabsList>
                    <TabsContent value="metrics">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2">
                            Daily Metrics
                          </h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Uptime</TableHead>
                                <TableHead>Response Time</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {platform.metrics.daily.map((metric) => (
                                <TableRow key={metric.date}>
                                  <TableCell>{metric.date}</TableCell>
                                  <TableCell>{metric.uptime}%</TableCell>
                                  <TableCell>{metric.responseTime}ms</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-2">
                            Weekly Metrics
                          </h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Period</TableHead>
                                <TableHead>Uptime</TableHead>
                                <TableHead>Response Time</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {platform.metrics.weekly.map((metric) => (
                                <TableRow key={metric.date}>
                                  <TableCell>{metric.date}</TableCell>
                                  <TableCell>{metric.uptime}%</TableCell>
                                  <TableCell>{metric.responseTime}ms</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="incidents">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {platform.incidents.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center">
                                No incidents reported
                              </TableCell>
                            </TableRow>
                          ) : (
                            platform.incidents.map((incident) => (
                              <TableRow key={incident.date}>
                                <TableCell>{incident.date}</TableCell>
                                <TableCell>{incident.description}</TableCell>
                                <TableCell>{incident.duration}</TableCell>
                                <TableCell>{incident.status}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </TabsContent>
                  </Tabs>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}