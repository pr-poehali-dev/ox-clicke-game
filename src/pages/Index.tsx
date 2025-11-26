import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type User = 'DYMEEN' | 'Artyman' | 'Blezer1234' | null;
type ServerStatus = 'Выключен' | 'В очереди' | 'Включен';

interface Request {
  user: string;
  timestamp: number;
}

const Index = () => {
  const [serverIP, setServerIP] = useState('');
  const [selectedUser, setSelectedUser] = useState<User>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showUserSelect, setShowUserSelect] = useState(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus>('Выключен');
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [requests, setRequests] = useState<Request[]>([]);
  const [currentUser, setCurrentUser] = useState<User>(null);

  const correctIP = 'ChadWorld.aternos.me';
  const correctPassword = 'Admin121114';
  const users: User[] = ['DYMEEN', 'Artyman', 'Blezer1234'];

  useEffect(() => {
    const interval = setInterval(() => {
      setRequests(prev => 
        prev.filter(req => Date.now() - req.timestamp < 30 * 60 * 1000)
      );
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const handleIPSubmit = () => {
    if (serverIP.toLowerCase() === correctIP.toLowerCase()) {
      setShowUserSelect(true);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleLogin = () => {
    if (selectedUser === 'DYMEEN') {
      if (password === correctPassword) {
        setIsAuthenticated(true);
        setCurrentUser(selectedUser);
      }
    } else if (selectedUser) {
      setIsAuthenticated(true);
      setCurrentUser(selectedUser);
    }
  };

  const handleStatusClick = () => {
    if (currentUser === 'DYMEEN') {
      setShowStatusMenu(!showStatusMenu);
    } else if (serverStatus === 'Выключен') {
      const newRequest: Request = {
        user: currentUser || '',
        timestamp: Date.now()
      };
      setRequests(prev => [...prev, newRequest]);
    }
  };

  const handleStatusChange = (status: ServerStatus) => {
    setServerStatus(status);
    setShowStatusMenu(false);
    if (status === 'Включен') {
      setRequests([]);
    }
  };

  const getStatusColor = () => {
    switch (serverStatus) {
      case 'Включен': return 'text-green-500';
      case 'В очереди': return 'text-yellow-500';
      case 'Выключен': return 'text-red-500';
    }
  };

  const getStatusGlow = () => {
    switch (serverStatus) {
      case 'Включен': return 'shadow-green-500/50';
      case 'В очереди': return 'shadow-yellow-500/50';
      case 'Выключен': return 'shadow-red-500/50';
    }
  };

  const isLoginDisabled = () => {
    if (!selectedUser) return true;
    if (selectedUser === 'DYMEEN' && password !== correctPassword) return true;
    return false;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1419] flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,217,255,0.1),transparent_50%)]" />
        
        <Card className="relative w-full max-w-md bg-card/60 backdrop-blur-xl border-primary/30 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-block mb-4 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg shadow-primary/50">
              <Icon name="Server" size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Aternos Loader
            </h1>
            <p className="text-muted-foreground mt-2">Войдите в систему управления</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="serverip" className="text-foreground mb-2">IP Сервера</Label>
              <div className="flex gap-2">
                <Input
                  id="serverip"
                  placeholder="ChadWorld.aternos.me"
                  value={serverIP}
                  onChange={(e) => setServerIP(e.target.value)}
                  className="bg-background/50 border-primary/30 focus:border-primary font-mono"
                  disabled={showUserSelect}
                />
                {!showUserSelect && (
                  <Button 
                    onClick={handleIPSubmit}
                    className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50"
                  >
                    <Icon name="Check" size={18} />
                  </Button>
                )}
              </div>
            </div>

            {showUserSelect && (
              <>
                <div>
                  <Label className="text-foreground mb-2">Выберите пользователя</Label>
                  <div className="space-y-2">
                    {users.map((user) => (
                      <button
                        key={user}
                        onClick={() => handleUserSelect(user)}
                        className={`w-full p-3 rounded-lg border text-left transition-all ${
                          selectedUser === user
                            ? 'border-primary bg-primary/20 shadow-lg shadow-primary/30'
                            : 'border-primary/30 bg-background/30 hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon 
                            name={user === 'DYMEEN' ? 'Crown' : 'User'} 
                            size={20} 
                            className={selectedUser === user ? 'text-primary' : 'text-muted-foreground'}
                          />
                          <span className="font-medium">{user}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedUser === 'DYMEEN' && (
                  <div>
                    <Label htmlFor="password" className="text-foreground mb-2">Пароль</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Введите пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-background/50 border-primary/30 focus:border-primary"
                    />
                  </div>
                )}

                <Button
                  onClick={handleLogin}
                  disabled={isLoginDisabled()}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed text-lg py-6"
                >
                  <Icon name="LogIn" size={20} className="mr-2" />
                  Войти
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1419] p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,217,255,0.05),transparent_70%)]" />
      
      <div className="relative max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/50">
              <Icon name="Server" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Aternos Loader</h1>
              <p className="text-sm text-muted-foreground">{correctIP}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-card/60 backdrop-blur-xl border border-primary/30 rounded-lg">
              <Icon 
                name={currentUser === 'DYMEEN' ? 'Crown' : 'User'} 
                size={18} 
                className="text-primary" 
              />
              <span className="font-medium">{currentUser}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAuthenticated(false)}
              className="border-red-500/50 text-red-500 hover:bg-red-500/10"
            >
              <Icon name="LogOut" size={16} />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className={`absolute inset-0 blur-3xl opacity-30 ${
            serverStatus === 'Включен' ? 'bg-green-500' :
            serverStatus === 'В очереди' ? 'bg-yellow-500' :
            'bg-red-500'
          }`} />
          
          <Card className="relative bg-card/60 backdrop-blur-xl border-primary/30 p-12 text-center">
            <div className="mb-6">
              <p className="text-lg text-muted-foreground mb-4">Статус сервера</p>
              
              <div className="relative inline-block">
                {currentUser === 'DYMEEN' && requests.length > 0 && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                )}
                
                <button
                  onClick={handleStatusClick}
                  className={`text-6xl font-black ${getStatusColor()} hover:scale-105 transition-transform cursor-pointer ${getStatusGlow()} shadow-2xl`}
                >
                  {serverStatus}
                </button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  serverStatus === 'Включен' ? 'bg-green-500 animate-pulse' :
                  serverStatus === 'В очереди' ? 'bg-yellow-500 animate-pulse' :
                  'bg-red-500'
                }`} />
                <span className="text-muted-foreground">
                  {serverStatus === 'Включен' && 'Сервер работает нормально'}
                  {serverStatus === 'В очереди' && 'Ожидание запуска...'}
                  {serverStatus === 'Выключен' && 'Сервер неактивен'}
                </span>
              </div>
            </div>

            {showStatusMenu && currentUser === 'DYMEEN' && (
              <div className="mt-6 space-y-2 animate-slide-up">
                {(['Выключен', 'В очереди', 'Включен'] as ServerStatus[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`w-full p-4 rounded-lg border transition-all ${
                      serverStatus === status
                        ? 'border-primary bg-primary/20'
                        : 'border-primary/30 bg-background/30 hover:border-primary/50 hover:bg-primary/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-lg">{status}</span>
                      <div className={`w-3 h-3 rounded-full ${
                        status === 'Включен' ? 'bg-green-500' :
                        status === 'В очереди' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentUser !== 'DYMEEN' && serverStatus === 'Выключен' && (
              <Button
                onClick={handleStatusClick}
                className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-xl hover:shadow-green-500/50 text-lg px-8 py-6"
              >
                <Icon name="Power" size={20} className="mr-2" />
                Подать запрос на включение
              </Button>
            )}

            {currentUser === 'DYMEEN' && requests.length > 0 && (
              <div className="mt-8 pt-8 border-t border-primary/30">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 justify-center">
                  <Icon name="Bell" size={20} className="text-green-500" />
                  Активные запросы
                </h3>
                <div className="space-y-2">
                  {requests.map((req, idx) => {
                    const timeLeft = Math.max(0, 30 * 60 * 1000 - (Date.now() - req.timestamp));
                    const minutesLeft = Math.floor(timeLeft / 60000);
                    
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Icon name="User" size={16} className="text-green-500" />
                          <span className="font-medium">{req.user}</span>
                        </div>
                        <span className="text-sm text-green-500">
                          {minutesLeft} мин
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Card className="bg-card/40 backdrop-blur-xl border-primary/30 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Users" size={20} className="text-primary" />
              <span className="font-semibold">Игроки онлайн</span>
            </div>
            <p className="text-3xl font-bold">{serverStatus === 'Включен' ? '2/20' : '0/20'}</p>
          </Card>

          <Card className="bg-card/40 backdrop-blur-xl border-primary/30 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Clock" size={20} className="text-primary" />
              <span className="font-semibold">Аптайм</span>
            </div>
            <p className="text-3xl font-bold">{serverStatus === 'Включен' ? '2ч 15м' : '0м'}</p>
          </Card>

          <Card className="bg-card/40 backdrop-blur-xl border-primary/30 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Activity" size={20} className="text-primary" />
              <span className="font-semibold">TPS</span>
            </div>
            <p className="text-3xl font-bold">{serverStatus === 'Включен' ? '20.0' : '0.0'}</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
