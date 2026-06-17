// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.exchange;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sports.modules.exchange.ExchangeItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ExchangeItemMapper extends BaseMapper<ExchangeItem> {

    /**
     * 原子扣减库存（防止超卖）
     * @param id 商品ID
     * @return 影响行数，0表示库存不足或商品不存在
     */
    default int decrementStock(@Param("id") Long id) {
        return this.update(null,
            new com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper<ExchangeItem>()
                .setSql("stock = stock - 1")
                .eq("id", id)
                .eq("deleted", 0)
                .gt("stock", 0)
        );
    }
}
