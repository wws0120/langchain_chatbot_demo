import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function page() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        香韻之旅 (Aroma Voyage)
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>關於我們</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            香韻之旅成立於2015年，是一家獨特的咖啡連鎖店，致力於帶領顧客踏上一段充滿香氣的環球咖啡之旅。我們精心挑選來自世界各地的優質咖啡豆，通過創新的烘焙技術和沖泡方法，為每位顧客呈現出咖啡的多樣風味和文化底蘊。
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">產品與價目</TabsTrigger>
          <TabsTrigger value="locations">分店資訊</TabsTrigger>
          <TabsTrigger value="membership">會員計劃</TabsTrigger>
          <TabsTrigger value="customization">客製化選項</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>產品與價目表</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">單品咖啡 (12oz)</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>哥倫比亞 蘇普莫 $58</li>
                <li>衣索比亞 耶加雪菲 $62</li>
                <li>肯亞 AA級 $65</li>
                <li>巴西 黃波旁 $55</li>
                <li>瓜地馬拉 安提瓜 $60</li>
              </ul>
              {/* Add more product categories here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="locations">
          <Card>
            <CardHeader>
              <CardTitle>分店地址和營業時間</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">香港分店：</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>中環店：中環皇后大道中28號中匯大廈地下G05舖</li>
                <li>銅鑼灣店：銅鑼灣軒尼詩道500號希慎廣場4樓401號舖</li>
                <li>尖沙咀店：尖沙咀廣東道30號新港中心地下25號舖</li>
              </ul>
              <p>
                <strong>營業時間：</strong>
                <br />
                週一至週五：07:00 - 22:00
                <br />
                週六、週日及公眾假期：08:00 - 23:00
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="membership">
          <Card>
            <CardHeader>
              <CardTitle>會員計劃 - 香韻探索家</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>如何加入：</strong>{' '}
                在店內或官網填寫表格，首次消費即可成為會員
              </p>
              <p>
                <strong>積分規則：</strong> 每消費 $10 可獲 1 積分
              </p>
              <h3 className="text-lg font-semibold mt-4 mb-2">獎勵和福利：</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>100積分可兌換中杯標準咖啡一杯</li>
                <li>會員專享每月特選飲品8折優惠</li>
                <li>生日當月獲贈特製生日飲品</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customization">
          <Card>
            <CardHeader>
              <CardTitle>客製化選項</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">可選的奶類</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>全脂牛奶: 經典選擇，口感濃郁。</li>
                <li>低脂牛奶: 減少脂肪攝取，適合健康飲食者。</li>
                <li>脫脂牛奶: 為追求極低脂肪的人士提供的選擇。</li>
              </ul>
              <h3 className="text-lg font-semibold mb-2">植物性奶類:</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>杏仁奶: 低卡、無乳糖，適合乳糖不耐症者。</li>
                <li>豆奶: 高蛋白質選擇，適合素食者。</li>
                <li>椰奶: 帶有天然椰子香氣，增添異國風情。</li>
                <li>燕麥奶: 天然甜味，適合環保人士。</li>
              </ul>
              {/* Add more customization options here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>聯繫我們</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>客服熱線：</strong> +852 1111 11111（服務時間：週一至週五
            09:00-18:00）
          </p>
          <p>
            <strong>電子郵件：</strong> customer@aromavoyage.com
          </p>
          <p>
            <strong>在線聊天：</strong> 官網 www.aromavoyage.com
            右下角（24/7服務）
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
