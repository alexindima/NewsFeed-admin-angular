<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('article_tag', function (Blueprint $table) {
            $table->foreignId('article_id')->index();
            $table->foreign('article_id')->on('articles')->references('id')->cascadeOnDelete();
            $table->foreignId('tag_id')->index();
            $table->foreign('tag_id')->on('tags')->references('id')->cascadeOnDelete();
            $table->primary(['article_id', 'tag_id']);
            $table->timestamps();

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article_tag');
    }
};
